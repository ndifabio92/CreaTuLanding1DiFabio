import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box, Button, Stack, TextField } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import { env } from "../../config/env";
import { openWhatsAppWithMessage } from "../../shared/whatsappUtils";
import { generateMailtoLink } from "../../shared/emailUtils";
import { contactStyles } from "./contact.styles";

const validationSchema = Yup.object({
  name: Yup.string().required("Requerido"),
  lastName: Yup.string().required("Requerido"),
  phoneNumber: Yup.string().required("Requerido"),
  inquiry: Yup.string().required("Requerido"),
});

const initialValues = {
  name: "",
  lastName: "",
  phoneNumber: "",
  inquiry: "",
};

const ContactForm: React.FC = () => {
  const handleWhatsApp = (values: typeof initialValues) => {
    const { name, lastName, phoneNumber, inquiry } = values;
    const message = `Hello, my name is ${name} ${lastName}. Phone: ${phoneNumber}.\nInquiry: ${inquiry}`;
    openWhatsAppWithMessage(message);
  };

  const handleEmail = (values: typeof initialValues) => {
    const { name, lastName, phoneNumber, inquiry } = values;
    const subject = "Inquiry from web form";
    const body = `Name: ${name} ${lastName}\nPhone: ${phoneNumber}\nInquiry: ${inquiry}`;
    const mailto = generateMailtoLink(env.VITE_EMAIL, subject, body);
    window.open(mailto);
  };

  return (
    <Box sx={contactStyles.contactForm}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
        validateOnMount
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          isValid,
          dirty,
        }) => (
          <Form>
            <Stack spacing={2}>
              <Field
                as={TextField}
                label="Nombre"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                fullWidth
              />
              <Field
                as={TextField}
                label="Apellido"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                fullWidth
              />
              <Field
                as={TextField}
                label="Numero de Teléfono"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
                fullWidth
              />
              <Field
                as={TextField}
                label="Consulta"
                name="inquiry"
                value={values.inquiry}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.inquiry && Boolean(errors.inquiry)}
                helperText={touched.inquiry && errors.inquiry}
                fullWidth
                multiline
                minRows={4}
              />
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<WhatsAppIcon />}
                  onClick={() => handleWhatsApp(values)}
                  disabled={!isValid || !dirty}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  startIcon={<EmailIcon />}
                  onClick={() => handleEmail(values)}
                  disabled={!isValid || !dirty}
                >
                  Email
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ContactForm;
