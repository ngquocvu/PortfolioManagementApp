import Link from "next/link";

export default function FourOhFour() {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <div>
        <h3>
          Follow this repository on Github:
          https://github.com/Nguyen-Quoc-Vu/SSM-App
        </h3>
      </div>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </>
  );
}
