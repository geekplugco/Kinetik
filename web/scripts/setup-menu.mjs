const SHOP = 'happy-kinetik.myshopify.com';
const TOKEN = process.env.SHOP_TOKEN;
const API = `https://${SHOP}/admin/api/2026-04/graphql.json`;
if (!TOKEN) { console.error('SHOP_TOKEN env required'); process.exit(1); }

async function gql(query, variables) {
  const r = await fetch(API, {
    method: 'POST',
    headers: { 'X-Shopify-Access-Token': TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const j = await r.json();
  if (j.errors) { console.error('GQL:', JSON.stringify(j.errors).slice(0, 400)); }
  return j.data;
}

async function ids() {
  const d = await gql('{ collections(first:30){ edges{ node{ id handle } } } pages(first:30){ edges{ node{ id handle } } } }');
  const col = {}, pg = {};
  d.collections.edges.forEach((e) => { col[e.node.handle] = e.node.id; });
  d.pages.edges.forEach((e) => { pg[e.node.handle] = e.node.id; });
  return { col, pg };
}

function col(map, handle, title, children = []) {
  return { title, type: 'COLLECTION', resourceId: map.col[handle], items: children };
}
function colLink(map, handle, title) {
  return { title, type: 'COLLECTION', resourceId: map.col[handle] };
}
function page(map, handle, title) {
  return { title, type: 'PAGE', resourceId: map.pg[handle] };
}

const TITLE = 'Main menu';

const run = async () => {
  const map = await ids();
  const items = [
    col(map, 'new-arrivals', 'New Arrivals', [
      colLink(map, 'new-arrivals', 'All new'),
      colLink(map, 'apparel', 'Apparel'),
      colLink(map, 'tech', 'Audio'),
    ]),
    col(map, 'apparel', 'Apparel', [
      colLink(map, 'apparel', 'Outerwear'),
      colLink(map, 'apparel', 'Bottoms'),
      colLink(map, 'apparel', 'Footwear'),
    ]),
    col(map, 'tech', 'Audio', [
      colLink(map, 'tech', 'Headphones'),
      colLink(map, 'tech', 'Earbuds'),
      colLink(map, 'tech', 'Speakers'),
    ]),
    colLink(map, 'apparel', 'Gear'),
    page(map, 'lookbook', 'Lookbook'),
  ];

  if (!map.col['new-arrivals'] || !map.col['apparel'] || !map.col['tech']) {
    console.error('Missing collections (new-arrivals/apparel/tech) — cannot build menu.');
    return;
  }

  const existing = await gql('{ menus(first:20){ edges{ node{ id handle } } } }');
  if (!existing) { console.error('Cannot read menus — token still lacks read_online_store_navigation. Re-auth with the new scope.'); return; }
  const mainMenu = existing.menus.edges.find((e) => e.node.handle === 'main-menu');

  if (mainMenu) {
    const d = await gql(
      `mutation($id:ID!,$title:String!,$items:[MenuItemUpdateInput!]!){ menuUpdate(id:$id,title:$title,items:$items){ menu{handle items{title items{title}}} userErrors{field message} } }`,
      { id: mainMenu.node.id, title: TITLE, items }
    );
    const res = d?.menuUpdate;
    if (!res) console.error('menuUpdate request failed (scope/token).');
    else if (res.userErrors?.length) console.error('menuUpdate errors:', JSON.stringify(res.userErrors));
    else console.log('OK — main-menu updated:', res.menu.items.map((i) => i.title + '(' + i.items.length + ')').join(', '));
  } else {
    const d = await gql(
      `mutation($handle:String!,$title:String!,$items:[MenuItemCreateInput!]!){ menuCreate(handle:$handle,title:$title,items:$items){ menu{handle} userErrors{field message} } }`,
      { handle: 'main-menu', title: TITLE, items }
    );
    const res = d?.menuCreate;
    if (!res) console.error('menuCreate request failed (scope/token).');
    else if (res.userErrors?.length) console.error('menuCreate errors:', JSON.stringify(res.userErrors));
    else console.log('OK — main-menu created.');
  }
};

run();
