import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Send } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import Spinner from "../components/common/Spinner";
import ErrorMessage from "../components/common/ErrorMessage";
import { getErrorMessage } from "../utils/helpers";
import { useSubmitContactFormMutation } from "../features/contact/contactApiSlice";
import { FormField } from "./componentsContact/FormField";
import { ContactInfoCard } from "./componentsContact/contactInfoCard";
import { CONTACT_INFO, VALIDATION_RULES } from "./data/contactInfoData";

const Contact = () => {
  const currentUser = useSelector(selectCurrentUser);
  const formRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: currentUser?.email || "",
    },
  });

  const [submitContactForm, { isLoading: isSubmitting, error: submitError }] =
    useSubmitContactFormMutation();

  useEffect(() => {
    if (currentUser?.email) {
      setValue("email", currentUser.email);
    }
    window.scrollTo(0, 0);
  }, [currentUser, setValue]);

  const onSubmit = async (data) => {
    try {
      const result = await submitContactForm(data).unwrap();
      toast.success(result.message);
      reset({
        firstName: "",
        lastName: "",
        email: currentUser?.email || "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact submission failed:", err);
      toast.error(getErrorMessage(err));
    }
  };

  const handlePhoneInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Information Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-8">
                  Get in Touch
                </h2>

                {CONTACT_INFO.map((info, index) => (
                  <ContactInfoCard key={index} {...info} />
                ))}

                <div className="mt-12 pt-8 border-t-2 border-blue-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">
                      Average response time:
                    </span>{" "}
                    2-4 hours during business hours
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3" ref={formRef}>
              <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-8">
                  Send a Message
                </h2>

                {submitError && (
                  <div className="mb-6">
                    <ErrorMessage message={getErrorMessage(submitError)} />
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="First Name *"
                      fieldName="firstName"
                      placeholder="John"
                      register={(name) =>
                        register(name, VALIDATION_RULES.firstName)
                      }
                      errors={errors}
                    />
                    <FormField
                      label="Last Name *"
                      fieldName="lastName"
                      placeholder="Doe"
                      register={(name) =>
                        register(name, VALIDATION_RULES.lastName)
                      }
                      errors={errors}
                    />
                  </div>
                  {/* Email */}
                  <FormField
                    label="Email *"
                    type="email"
                    fieldName="email"
                    register={register}
                    errors={errors}
                    disabled
                  />
                  {/* Phone */}
                  <FormField
                    label="Phone"
                    type="tel"
                    fieldName="phone"
                    placeholder="(555) 123-4567"
                    register={(name) => register(name, VALIDATION_RULES.phone)}
                    errors={errors}
                    onInput={handlePhoneInput}
                  />
                  {/* Subject */}
                  <FormField
                    label="Subject *"
                    fieldName="subject"
                    placeholder="What is your inquiry about?"
                    register={(name) =>
                      register(name, VALIDATION_RULES.subject)
                    }
                    errors={errors}
                  />
                  {/* Message */}
                  <FormField
                    label="Message *"
                    type="textarea"
                    fieldName="message"
                    placeholder="Please provide details about your inquiry..."
                    register={(name) =>
                      register(name, VALIDATION_RULES.message)
                    }
                    errors={errors}
                    rows={6}
                  />
                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner size="sm" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Contact;
