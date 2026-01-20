import {
  Card,
  // CardAction,
  // CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function HeroCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly investment</CardTitle>
        <CardDescription className='flex xs:items-center xs:justify-center text-5xl text-blue-100'>
          <p>48,55€</p>
        </CardDescription>
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>
      {/* <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter> */}
    </Card>
  );
}
