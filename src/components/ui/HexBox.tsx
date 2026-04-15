import classNames from "classnames";

export const HexBox = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (<div className={classNames("hex", className)}>
    {children}
  </div>)
}

HexBox.Title = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-base font-bold">{children}</p>
}

HexBox.Subtitle = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-xs">{children}</p>
}