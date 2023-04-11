import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { logger } from "@sentry/utils";

export const loader: LoaderFunction = async ({ params: { id } }) => {
  //   if (id === "-1") {
  //     throw new Error("Unexpected Server Error from Loader");
  //   }

  return "";
};

export const action: ActionFunction = async (arg) => {
  const {
    params: { id },
  } = arg;
  logger.log("action", arg);
  if (id === "-1") {
    throw new Error("Remix server error");
  }

  if (id === "-2") {
    // Note: This GET request triggers the `Loader` of the URL, not the `Action`.
    throw redirect("/action-json-response/-1");
  }

  if (id === "-3") {
    throw json({}, { status: 500, statusText: "Sentry Test Error" });
  }

  if (id === "-4") {
    throw json({ data: 1234 }, { status: 500 });
  }

  if (id === "-5") {
    throw json("Sentry Test Error [string body]", { status: 500 });
  }

  if (id === "-6") {
    throw json({}, { status: 500 });
  }

  throw new Error("oh no");

  return json({ test: "test" });
};

export default function ActionJSONResponse() {
  const data = useActionData();

  return (
    <div>
      <h1>{data && data.test ? data.test : "Not Found"}</h1>
    </div>
  );
}
