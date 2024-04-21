export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password: string) => {
  const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!&$%@]).{8,20}$/;
  return re.test(String(password));
};

export function validateUrls(urlString: string) {
  const urlRegex =
    /^(?:(?:https?:\/\/)?(?:www\.)?(?:(?:[\w-]+\.)+[a-z]{2,}|localhost)(?::\d+)?)(?:\/\S*)?$/;

  const urlArray = urlString.split(",");

  const invalidUrls = [];

  for (const url of urlArray) {
    const trimmedUrl = url.trim();
    let isvalid = urlRegex.test(trimmedUrl);
    if (!isvalid) {
      invalidUrls.push(trimmedUrl);
    }
  }
  if (invalidUrls.length > 0) {
    return invalidUrls.toString();
  }
  return true;
}
