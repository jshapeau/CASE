import { CaseEntity, Entity, Prop } from '@casejs/case'

@Entity({
  nameSingular: '<%= name %>',
  namePlural: '<%= pluralizedName %>',
  propIdentifier: 'name',
  slug: '<%= dasherizedName %>s',
})
export class <%= classifiedName %> extends CaseEntity {
  @Prop({
    label: 'Name of the <%= name %>',
  })
  name: string
}
