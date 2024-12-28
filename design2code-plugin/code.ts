const API_ENDPOINT = "http://localhost:8000/api/v1";

type FormValueTypes = {
  framework: string;
  stylingLib: string;
};

const FigmaEvent = {
  showNotification: (content: string) => {
    figma.ui.postMessage({
      type: "show-notification",
      payload: content,
    });
  },
  generatingCodeSuccess: (jsxResponse: string) => {
    figma.ui.postMessage({
      type: "generating-code-success",
      payload: jsxResponse,
    });
  },
  generatingCodeFinished: () => {
    figma.ui.postMessage({
      type: "generating-code-finished",
    });
  },
};

figma.showUI(__html__, { width: 800, height: 500 });

figma.ui.onmessage = (msg: { type: string; payload: unknown }) => {
  if (msg.type === "form-submit") {
    downloadFile(msg.payload as FormValueTypes);
    return;
  }
};

function downloadFile(formValues: FormValueTypes) {
  const selection = figma.currentPage.selection[0];
  if (!selection) {
    FigmaEvent.showNotification("Please select a layer");
    FigmaEvent.generatingCodeFinished();
    return;
  }

  const jsonPromise = selection.exportAsync({
    format: "JSON_REST_V1",
  });

  const imagePromise = selection
    .exportAsync({
      format: "PNG",
      constraint: { type: "SCALE", value: 1 },
    })
    .then((data) => {
      var base64String = btoa(
        String.fromCharCode.apply(null, Array.from(new Uint8Array(data)))
      );
      return base64String;
    });

  Promise.all([jsonPromise, imagePromise]).then((values) => {
    const streamlinedJson = removePropertiesByKey(values[0], [
      "id",
      "componentId",
      "layoutVersion",
      // "absoluteBoundingBox",
    ]);
    const jsonStr = JSON.stringify(streamlinedJson as string);
    const image = values[1] as string;

    const data = {
      img_type: "png",
      img_base64: image,
      json_string: jsonStr,
      framework: formValues.framework,
      styling_lib: formValues.stylingLib,
    };

    console.log("submitted data", data);
    submitFigmaData(data);
  });
}

async function submitFigmaData(data: Object) {
  try {
    const pureResponse = await fetch(`${API_ENDPOINT}/generate`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await pureResponse.json();
    console.log(jsonResponse.response);
    FigmaEvent.generatingCodeSuccess(jsonResponse.response);
  } catch (error) {
    console.log("API error: ", error);
  } finally {
    FigmaEvent.generatingCodeFinished();
  }
}

/**
 * Utilities
 */

function btoa(input: string): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let str = input;
  let output = "";

  for (
    let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || ((map = "="), i % 1);
    output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
  ) {
    charCode = str.charCodeAt((i += 3 / 4));

    if (charCode > 0xff) {
      throw new Error(
        "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
      );
    }

    block = (block << 8) | charCode;
  }

  return output;
}

function removePropertiesByKey<T extends Record<string, any>>(
  obj: T,
  keysToRemove: string[]
): T {
  if (typeof obj !== "object" || obj === null) return obj;

  for (const key in obj) {
    if (keysToRemove.includes(key)) {
      delete obj[key];
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      obj[key] = removePropertiesByKey(obj[key], keysToRemove);
    }
  }

  return obj;
}
