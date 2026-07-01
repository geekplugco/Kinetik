Centered modal for the size guide, quick view, or confirmations. Closes on overlay, ✕, or Escape.

```jsx
<Dialog open={open} onClose={close} title="Size Guide"
  footer={<Button variant="inverse" block onClick={close}>Done</Button>}>
  <SizeTable />
</Dialog>
```

For a destructive confirm, keep it short and put the action in the footer.
