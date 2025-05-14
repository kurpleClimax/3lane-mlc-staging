import Link from "next/link";
import useCheckIfExternalUrl from "@/hooks/useCheckIfExternalUrl";

export default function CustomButton({
  href,
  className,
  target,
  scroll,
  children,
}) {
  const isExternalUrl = useCheckIfExternalUrl(href);

  return (
    <Link
      href={href ?? ""}
      className={className}
      target={target || (isExternalUrl ? "_target" : "_self")}
      rel={isExternalUrl || target === "_blank" ? "noopener" : ""}
      scroll={scroll ?? true}
    >
      {children}
    </Link>
  );
}
