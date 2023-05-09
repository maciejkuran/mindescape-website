import Image from 'next/image';

const Custom404Page = () => {
  return (
    <section>
      <div>
        <h1>Oops! Page Not Found! 😮</h1>
        <Image height={300} width={300} src="/images/404.svg" alt="404" />
      </div>
    </section>
  );
};

export default Custom404Page;
