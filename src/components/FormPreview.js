// FormPreview.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const FormPreview = ({ uiSchema }) => {
  const { control, handleSubmit, setValue, watch } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Implement logic to send data to the backend
  };

  const renderFormElements = (fields, parentKey = '') => {
    return fields.map((field, index) => {
      const key = `${parentKey}.${field.jsonKey || index}`;

      switch (field.uiType) {
        case 'Input':
          return (
            <div key={key}>
              <label>{field.label}</label>
              <Controller
                name={key}
                control={control}
                render={({ field }) => <input {...field} placeholder={field.placeholder} />}
                rules={{ required: field.validate.required }}
              />
            </div>
          );

        case 'Group':
          return (
            <div key={key}>
              <label>{field.label}</label>
              {renderFormElements(field.subParameters, key)}
            </div>
          );

        case 'Radio':
          return (
            <div key={key}>
              <label>{field.label}</label>
              {field.validate.options.map((option) => (
                <div key={option.value}>
                  <input
                    type="radio"
                    value={option.value}
                    {...control.register(key)}
                    defaultChecked={option.value === field.validate.defaultValue}
                  />
                  {option.label}
                </div>
              ))}
            </div>
          );

        case 'Ignore':
          return (
            watch(`${parentKey}.type`) === field.conditions[0].value ? (
              <div key={key}>
                {renderFormElements(field.subParameters, key)}
              </div>
            ) : null
          );

        case 'Select':
          return (
            <div key={key}>
              <label>{field.label}</label>
              <Controller
                name={key}
                control={control}
                render={({ field }) => (
                  <select {...field} defaultValue={field.defaultValue}>
                    {field.validate.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
                rules={{ required: field.validate.required }}
              />
            </div>
          );

        case 'Switch':
          return (
            <div key={key}>
              <label>{field.label}</label>
              <Controller
                name={key}
                control={control}
                render={({ field }) => <input type="checkbox" {...field} />}
              />
            </div>
          );

        default:
          return null;
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {uiSchema && uiSchema.length > 0 && renderFormElements(uiSchema)}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormPreview;
