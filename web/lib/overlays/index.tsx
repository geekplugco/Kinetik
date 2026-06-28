import { CartDrawer } from "./cart-drawer";
import { SearchDrawer } from "./search-drawer";
import { QuickView } from "./quick-view";
import { NewsletterPopup } from "./newsletter-popup";

export function Overlays() {
  return (
    <>
      <CartDrawer />
      <SearchDrawer />
      <QuickView />
      <NewsletterPopup />
    </>
  );
}
