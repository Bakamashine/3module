import type ValidationErrors from "interface/ValidationError";

export default function ShowError({errors}: {errors?: string[]}) {
  return (
    <>
      {errors && errors.length > 0 && (
        <div className="error">
          {errors.map((item) => (
            <p key={item} className="text-danger">
              {item}
            </p>
          ))}
        </div>
      )}
    </>
  );
}
