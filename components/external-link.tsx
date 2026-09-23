import { Href, Link } from "expo-router";
import { openBrowserAsync, WebBrowserPresentationStyle } from "expo-web-browser";
import { useState, type ComponentProps } from "react";
import { Alert } from "react-native";
import { externalLinkAction } from "@/lib/external-link-state";
import { reportAppError } from "@/lib/error-reporting";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: Href & string };

export function ExternalLink({ href, ...rest }: Props) {
  const [isOpening, setIsOpening] = useState(false);

  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      accessibilityState={{ busy: isOpening, disabled: isOpening }}
      onPress={async (event) => {
        const action = externalLinkAction(process.env.EXPO_OS === "web" ? "web" : "native", isOpening);
        if (action === "ignore") {
          event.preventDefault();
          return;
        }
        if (action === "open-in-app-browser") {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          setIsOpening(true);
          try {
            await openBrowserAsync(href, {
              presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
            });
          } catch (error) {
            reportAppError("external-link", error);
            Alert.alert("Unable to open link", "Please try again when your browser is available.");
          } finally {
            setIsOpening(false);
          }
        }
      }}
    />
  );
}
