const HEX_W = 200;
const HEX_H = 160;
const ROW_OVERLAP = -(HEX_H * 0.25);
const ROW_OFFSET = HEX_W / 2;

export const HexGrid = ({ items, cols = 5, renderHex }: { items: any[], cols?: number, renderHex: (item: any) => React.ReactNode }) => {
  const rows = [];
  for (let r = 0; r * cols < items.length; r++) {
    rows.push(items.slice(r * cols, r * cols + cols));
  }

  return (
    <div className="flex flex-col items-start overflow-y-auto">
      {rows.map((row, r) => (
        <div
          key={r}
          className="flex"
          style={{
            marginTop: r === 0 ? 0 : ROW_OVERLAP,
            marginLeft: r % 2 === 1 ? ROW_OFFSET : 0,
          }}
        >
          {row.map((item, i) => (
            <div
              key={i}
              className="hex-animate flex items-center justify-center cursor-pointer"
              style={{
                width: HEX_W,
                height: HEX_H,
                animationDelay: `${(r * cols + i) * 60}ms`,
              }}
            >
              <div
                className="flex items-center justify-center text-center hover:opacity-75 transition-opacity"
                style={{
                  width: HEX_W - 8,
                  height: HEX_H - 8,
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                {renderHex(item)}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}