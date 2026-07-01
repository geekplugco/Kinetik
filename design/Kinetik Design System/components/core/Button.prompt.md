Square, uppercase, display-type button. `primary` is volt and is the page's single conversion action — don't stack two on one view. `secondary` is the hairline-outline default; `inverse` is a solid ink block; `ghost` is borderless.

```jsx
<Button variant="primary" iconLeft={<Icon name="bag" size={17} />}>Add to Cart — $420</Button>
<Button>View Details</Button>
<Button variant="inverse" iconRight={<Icon name="arrowRight" size={17} />}>Checkout</Button>
```

Sizes `sm | md | lg`. Use `block` for drawer/PDP full-width CTAs. Pass `uppercase={false}` for sentence-case links-as-buttons.
