import { useState } from "react";
import { useEffect } from "react";

function useStashToast() {
  const [loaded, setLoaded] = useState(false);
  const [stashToastId] = useState(`stash-toast-${Date.now()}`);
  useEffect(() => {
    const div = document.createElement("div");
    div.id = stashToastId;
    div.style =
      "position: fixed; right: 50%; transform: translate(50%, 2%); z-index: 99999999";
    document.getElementsByTagName("body")[0].prepend(div);
    setLoaded(true);

    return () => document.getElementsByTagName("body")[0].removeChild(div);
  }, [stashToastId]);

  return { loaded, stashToastId };
}

export default useStashToast;
