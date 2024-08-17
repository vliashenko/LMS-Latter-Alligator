import Footer from "./footer";
import Header from "./header";

type Props = {
  children: React.ReactNode;
};

export default function MarketingLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="bg-[#08e1ae] bg-[linear-gradient(315deg,#08e1ae_0%,#98de5b_74%)] flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
