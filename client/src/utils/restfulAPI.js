import Ajv from 'ajv';

export async function sendServerRequest(requestBody, serverPort=getOriginalServerPort()) {
    const fetchOptions = {
        method: "POST",
        body: JSON.stringify(requestBody)
    };

    try {
        const response = await fetch(`${serverPort}/api/${requestBody.requestType}`, fetchOptions);
        if (!response.ok) {
            return null;
        }
        return response.json();
    } catch (error) {
        return null;
    }
}

export function getOriginalServerPort() {
    const serverProtocol = location.protocol;
    const serverHost = location.hostname;
    const serverPort = location.port;
    const alternatePort = process.env.SERVER_PORT;
    return `${serverProtocol}\/\/${serverHost}:${(!alternatePort ? serverPort : alternatePort)}`;
}

export function isJsonResponseValid(object, schema) {
    const anotherJsonValidator = new Ajv();
    const validate = anotherJsonValidator.compile(schema);
    return validate(object);
}

export function downloadFile(fileText, fileName, fileType) {
    let file = new Blob([fileText], {type: fileType});
    let a = document.createElement('a'),
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  
  export function isSupportedFeature(config, feature, supportedFeatures) {
    if (supportedFeatures.includes(feature)) {
        if(feature == 'type' || feature == 'where') {
            return config[feature] != null;
        } else {
            return true;
        }
    }
    return false;
}