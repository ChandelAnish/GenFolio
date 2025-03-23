import PortfolioWrapper from "@/components/WrapperComponent";
// import { cookies } from 'next/headers'

export default async function page() {

  // const cookieStore = await cookies()
  // const theme = cookieStore.get('portfolioData')
  // console.log(theme)

  return (
    <>
      <PortfolioWrapper/>
    </>
  );
}
