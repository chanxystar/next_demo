// app/page.tsx
import { Link, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { getCurrentUser } from "@/lib/session";

export default async function Home() {
  const user: IUserInfo | undefined = await getCurrentUser();

  return (
    <>
      {user ? (
        <Card  className="py-4" style={{ width: 300, margin:"100px auto",}}>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">{user.username}</p>
            <small className="text-default-500">{user.email}</small>
            <h4 className="font-bold text-large">{user.sub}</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={user.avatar}
              width={270}
            />
          </CardBody>
        </Card>
      ) : (
        <Link href="/login" />
      )}
    </>
  );
}
