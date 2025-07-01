import { Breadcrumbs as MUIBreadcrumbs, Typography } from "@mui/material";

interface BreadcrumbItem {
  label: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      {items.map((item, idx) => (
        <Typography key={idx} color={idx === items.length - 1 ? "text.primary" : "inherit"}>
          {item.label}
        </Typography>
      ))}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs; 