import { makeStyles } from "@material-ui/core";
interface UpperBarProps {
  children: any;
}
const UpperBar = ({ children }: UpperBarProps) => {
  const styles = useStyles();
  return <div className={styles.upperBar}>{children}</div>;
};
export default UpperBar;
const useStyles = makeStyles((theme) => ({
  upperBar: {
    paddingTop: "2rem",
    paddingBottom: "1rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1.5rem 0",
      borderBottom: "4px solid #ddd",
    },
    borderBottom: "1px solid #ddd",
  },
}));
