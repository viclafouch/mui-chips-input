# React Hook Form

Here an example if you want to plug `MuiChipsInput` to your form using [React Hook Form](https://react-hook-form.com/).

```tsx
import React from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import { MuiChipsInput } from "mui-chips-input";
import { Controller, useForm } from "react-hook-form";

const App = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      chips: []
    }
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="chips"
        control={control}
        render={({ field, fieldState }) => (
          <MuiChipsInput
            {...field}
            hideClearAll
            error={fieldState.invalid}
          />
        )}
      />
     <div>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </div>
    </form>
  )
}
```

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-hook-form-with-mui-chips-input-xwyhg5?theme=dark)