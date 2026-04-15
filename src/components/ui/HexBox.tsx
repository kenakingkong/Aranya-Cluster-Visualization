import classNames from "classnames";

export const HexBox = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (<div className={classNames("hex", className)}>
    {children}
  </div>)
}