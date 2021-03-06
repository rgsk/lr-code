import { makeStyles } from "@material-ui/core";
import Link from "next/link";
export interface PrimaryLinkProps {
  children: JSX.Element | string;
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
  type?: "error" | "warning" | "info" | "success";
}
const PrimaryLink = ({
  children,
  href,
  target,
  type = "success",
}: PrimaryLinkProps) => {
  const styles = useStyles();
  return (
    <p
      style={{
        display: "inline-block",
      }}
    >
      {!target ? (
        <Link href={href}>
          <a className={styles.PrimaryLink}>{children}</a>
        </Link>
      ) : (
        <a
          className={styles.PrimaryLink}
          href={href}
          target={target}
          rel="noreferrer"
        >
          {children}
        </a>
      )}
    </p>
  );
};
export default PrimaryLink;
const useStyles = makeStyles((theme) => ({
  PrimaryLink: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "inherit",
    fontWeight: "bold",
  },
}));
