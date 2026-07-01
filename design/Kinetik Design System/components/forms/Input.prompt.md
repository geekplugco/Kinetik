Square hairline text input with a mono uppercase label. Focus draws an ink block.

```jsx
<Input label="Email" type="email" placeholder="you@domain.com" />
<Input iconLeft={<Icon name="search" size={16} />} placeholder="Search gear" />
<Input label="Discount" invalid hint="Code not recognized" />
```

Pass standard input props through (`value`, `onChange`, `type`). Use `size="lg"` for checkout fields.
