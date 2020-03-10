import { useState } from "react";

const cookieParser = Object
  .fromEntries(document.cookie.split(/; */)
  .map(
    x => x
      .split('=')
      .map(decodeURIComponent)
  )
)

export default function useCookie(key) {
  const [cookies, setInnerCookie] = useState(cookieParser);

  if (key) {
    function setCookie(value) {
      document.cookie = `${key}=${encodeURIComponent(value)}`
      setInnerCookie(cks => ({ ...cks, [key]: value }));
    };

    return [cookies[key], setCookie]
  }

  function setCookies(...values) {
    if (Array.isArray(values)) {
      const newCookies = values.reduce(
        (acc, val) => {
          document.cookie = `${val[0]}=${encodeURIComponent(val[1])}`
          acc = {
            ...acc,
            [val[0]]: val[1],
          }
          return acc
        },
        {}
      )

      setInnerCookie(cks => ({ ...cks, ...newCookies }))
    }
  }

  return [cookies, setCookies];
}
