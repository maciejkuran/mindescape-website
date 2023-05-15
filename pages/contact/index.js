import useHttp from '@/hooks/useHttp';
import classes from './index.module.scss';
import Form from '@/components/Form/Form';
import reqConfig from '@/utils/reqConfig';
import Image from 'next/image';

const ContactPage = () => {
  const {
    sendFetchReq: sendPostReq,
    isLoading: postReqIsLoading,
    data: postRes,
    error: postError,
    success: postSuccess,
  } = useHttp();

  //Submitting message with accessing data from the child component
  const sendPostRequest = data => {
    sendPostReq(`${process.env.NEXT_PUBLIC_API_URL}/messages`, reqConfig('POST', data));
  };

  return (
    <section className={classes.contact}>
      <div className={classes['contact__form']}>
        <h1>👋 Happy to Talk to You</h1>
        <p>Wanna talk?</p>
        <Form
          state={{ postReqIsLoading, postError, postSuccess, postRes }}
          sendPostRequest={sendPostRequest}
          comments={false}
          textarea="Message..."
        />
      </div>
      <div className={classes['contact__img']}>
        <Image alt="mindescape contact" src="/images/contact.jpg" height={500} width={900} />
      </div>
    </section>
  );
};

export default ContactPage;
