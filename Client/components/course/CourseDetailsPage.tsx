import React, { useEffect, useState } from 'react';
import { useGetCoursesDetailsQuery } from '@/redux/features/courses/coursesApi';
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Headings';
import Header from '../Header';
import Footer from '../Footer';
import CourseDetails from './CourseDetails';
import { useCreatePaymentIntentMutation, useGetStripePublishablekeyQuery } from '@/redux/features/orders/ordersApi';
import { loadStripe } from "@stripe/stripe-js";

type Props = {
  id: string;
};

const CourseDetailsPage: React.FC<Props> = ({ id }) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCoursesDetailsQuery(id);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishableKey = config?.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    }
    if (data) {
        const amount = Math.round(data.course.price * 100);
        createPaymentIntent(amount);
      }
  }, [config,data]);




  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        data && (
          <div>
            <Heading
              title={`${data.course.name} - ELearning`}
              description="Online Programming to enable programming skills"
              keywords={data.course.tags}
            />

            <Header
              route={route}
              setRoute={setRoute}
              open={open}
              setOpen={setOpen}
              activeItem={1}
            />

            {stripePromise && (
              <CourseDetails data={data.course} stripePromise={stripePromise} clientSecret={clientSecret} />
            )}

            <Footer />
          </div>
        )
      )}
    </>
  );
};

export default CourseDetailsPage;
