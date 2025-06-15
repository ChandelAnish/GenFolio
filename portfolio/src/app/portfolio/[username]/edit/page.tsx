import ActionDispatchWrapper from "@/components/ActionDispatchWrapper";
import PortfolioWrapper from "@/components/WrapperComponent";
// import { cookies } from 'next/headers'

export default async function page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // const cookieStore = await cookies()
  // const theme = cookieStore.get('portfolioData')
  // console.log(theme)
  const encodedUsername = (await params).username;
  const decodedUsername = decodeURIComponent(encodedUsername);
  return (
    <>
      <ActionDispatchWrapper username={decodedUsername} >
        <PortfolioWrapper />
      </ActionDispatchWrapper>
    </>
  );
}
