import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentModule extends Struct.ComponentSchema {
  collectionName: 'components_component_modules';
  info: {
    displayName: 'Module';
    icon: 'bulletList';
  };
  attributes: {
    details: Schema.Attribute.Text & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    numberOfClasses: Schema.Attribute.Integer & Schema.Attribute.Required;
    topicsCovered: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'component.module': ComponentModule;
    }
  }
}
