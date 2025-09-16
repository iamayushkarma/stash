import { useState } from "react";
import { useEffect } from "react";

function useStashToast() {
  const [loaded, setLoaded] = useState(false);
  const [stashToastId] = useState(`stash-toast-${Date.now()}`);
  useEffect(() => {
    const div = document.createElement("div");
    div.id = stashToastId;
    div.className = "stash-toast";
    div.style =
      "position: fixed; top: 1.5%; right: 50%; transform: translate(50%); z-index: 99999999";

    document.body.prepend(div);
    setLoaded(true);

    return () => {
      // The cleanup just removes the div
      const element = document.getElementById(stashToastId);
      if (element) {
        document.body.removeChild(element);
      }
    };
  }, [stashToastId]);
  return { loaded, stashToastId };
}

export default useStashToast;
