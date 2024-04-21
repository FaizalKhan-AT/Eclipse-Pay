import { FC, Fragment, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";

export const BreadcrumbHeader: FC = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  function locationChanged() {
    setBreadcrumbs(location.pathname.split("/"));
  }

  useEffect(() => {
    locationChanged();
  }, [location]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((el, idx) => {
          let slash = "/";
          let l =
            breadcrumbs[idx - 1] === ""
              ? el
              : breadcrumbs[idx - 1] + slash + el;
          let link = el === "" ? slash : l;
          return (
            <Fragment key={el + idx}>
              <BreadcrumbItem>
                {idx !== breadcrumbs.length - 1 ? (
                  <>
                    <BreadcrumbLink
                      className="capitalize"
                      to={(link === slash ? "" : slash) + link}
                    >
                      {el === "" ? "Home" : el}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                ) : (
                  <BreadcrumbPage className="capitalize">{el}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
