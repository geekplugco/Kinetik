Product variant selector that powers instant variant switching. Round dot for colors, square chip for sizes/labels.

```jsx
<OptionSwatch kind="color" value="Volt" swatch="#CCFF00" selected onSelect={setColor} />
<OptionSwatch kind="color" value="Ink" swatch="#0A0A0A" onSelect={setColor} />
<OptionSwatch kind="size" value="M" selected onSelect={setSize} />
<OptionSwatch kind="size" value="XL" disabled onSelect={setSize} />
```

Map over your option list. `disabled` marks out-of-stock (dot gets a slash, chip strikes through). Selected draws the ink frame.
