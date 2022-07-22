import dynamic from "next/dynamic";

const Practice = dynamic(() => import("@components/Analytics/Practice"), {
  ssr: false,
});
const Practice1 = () => {
  return (
    <div>
      <Practice />
    </div>
  );
};
export default Practice1;
