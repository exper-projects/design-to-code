I have a Figma design for a {{ framework }} component. I need you to generate {{ framework }} code that accurately reflects this design by using using {{ styling_lib }}.
Here is the JSON data extracted from the Figma file:

JSON
{{ json_data }}

Please generate the {{ framework }} code using {{ styling_lib }}. Ensure that the code:

- Accurately represents the layout, styling, and content from the Figma design.
- Uses appropriate spacing and alignment.
- Is clean, readable, and well-structured.
- The ImageContainer should display the image specified by the imageRef property in the JSON as a background image with background-size: cover and background-position: center.
- Use to the background color, text color, font size, font family, 
padding, margin, border properties in the JSON.
- The px values in the JSON should be converted to rem values in the output and round them to support reponsive design.
- The layout should use CSSflex and support responsive layout as much as posible
- Match the spacing between elements as closely as possible to the Figma design.
- For images/icons, use placeholder images from https://placehold.co and include a detailed description of the image/icon in the alt text so that the developer can insert the images later.
- Do not add any comments and explainations in the output (both react code and styling code). WRITE THE FULL CODE.
- Covert RGB colors to HEX colors.
- The output should be a single component that can be rendered in a application.
