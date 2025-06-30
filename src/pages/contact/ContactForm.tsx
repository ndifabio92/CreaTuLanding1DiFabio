import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Stack, TextField } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import { env } from "../../config/env";
import { openWhatsAppWithMessage } from "../../shared/whatsappUtils";
import { generateMailtoLink } from "../../shared/emailUtils";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  apellido: Yup.string().required("El apellido es obligatorio"),
  telefono: Yup.string().required("El teléfono es obligatorio"),
  consulta: Yup.string().required("La consulta es obligatoria"),
});

export const ContactForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      telefono: "",
      consulta: "",
    },
    validationSchema,
    onSubmit: () => {}, // No submit, handled by buttons
  });

  const handleWhatsApp = () => {
    const { nombre, apellido, telefono, consulta } = formik.values;
    const message = `Hola, mi nombre es ${nombre} ${apellido}. Teléfono: ${telefono}.\nConsulta: ${consulta}`;
    openWhatsAppWithMessage(message);
  };

  const handleEmail = () => {
    const { nombre, apellido, telefono, consulta } = formik.values;
    const subject = "Consulta desde formulario web";
    const body = `Nombre: ${nombre} ${apellido}\nTeléfono: ${telefono}\nConsulta: ${consulta}`;
    const mailto = generateMailtoLink(env.VITE_EMAIL, subject, body);
    window.open(mailto);
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
    >
      <Stack spacing={2}>
        <TextField
          label="Nombre"
          name="nombre"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.nombre && Boolean(formik.errors.nombre)}
          helperText={formik.touched.nombre && formik.errors.nombre}
          fullWidth
        />
        <TextField
          label="Apellido"
          name="apellido"
          value={formik.values.apellido}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.apellido && Boolean(formik.errors.apellido)}
          helperText={formik.touched.apellido && formik.errors.apellido}
          fullWidth
        />
        <TextField
          label="Teléfono"
          name="telefono"
          value={formik.values.telefono}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.telefono && Boolean(formik.errors.telefono)}
          helperText={formik.touched.telefono && formik.errors.telefono}
          fullWidth
        />
        <TextField
          label="Consulta"
          name="consulta"
          value={formik.values.consulta}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.consulta && Boolean(formik.errors.consulta)}
          helperText={formik.touched.consulta && formik.errors.consulta}
          fullWidth
          multiline
          minRows={4}
        />
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="success"
            startIcon={<WhatsAppIcon />}
            onClick={handleWhatsApp}
            disabled={!formik.isValid || !formik.dirty}
          >
            Enviar por WhatsApp
          </Button>
          <Button
            variant="contained"
            color="warning"
            startIcon={<EmailIcon />}
            onClick={handleEmail}
            disabled={!formik.isValid || !formik.dirty}
          >
            Enviar por Email
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
