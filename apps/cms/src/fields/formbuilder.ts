import { FieldsConfig } from '@payloadcms/plugin-form-builder/dist/types'

export const formBuilderFieldsConfig: FieldsConfig = {
  payment: false,
  text: {
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'name',
            label: 'Name (lowercase, no spaces or special characters)',
            type: 'text',
            required: true,
          },
          {
            name: 'label',
            label: 'Label',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'placeholder',
            type: 'text',
            required: false,
          },
          {
            label: 'Required',
            name: 'required',
            type: 'checkbox',
            required: false,
          },
        ],
      },
    ],
  },
  email: {
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'name',
            label: 'Name (lowercase, no spaces or special characters)',
            type: 'text',
            required: true,
          },
          {
            name: 'label',
            label: 'Label',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'placeholder',
            type: 'text',
            required: false,
          },
          {
            label: 'Required',
            name: 'required',
            type: 'checkbox',
            required: false,
          },
        ],
      },
    ],
  },
  textarea: {
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'name',
            label: 'Name (lowercase, no spaces or special characters)',
            type: 'text',
            required: true,
          },
          {
            name: 'label',
            label: 'Label',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'placeholder',
            type: 'text',
            required: false,
          },
          {
            label: 'Required',
            name: 'required',
            type: 'checkbox',
            required: false,
          },
        ],
      },
    ],
  },
  checkbox: {
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'name',
            label: 'Name (lowercase, no spaces or special characters)',
            type: 'text',
            required: true,
          },
          {
            name: 'label',
            label: 'Label',
            type: 'text',
            required: true,
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            label: 'Required',
            name: 'required',
            type: 'checkbox',
            required: false,
          },
        ],
      },
    ],
  },
}
