import "react";

declare module "react" {
  interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
    loading?: "lazy" | "eager" | "auto" | string;
  }
}
