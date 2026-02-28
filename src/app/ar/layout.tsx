export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" lang="ar" style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
      {children}
    </div>
  );
}
