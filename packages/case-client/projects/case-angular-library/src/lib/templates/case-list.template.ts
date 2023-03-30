export const caseListTemplate = `
<!-- Heading -->
<div class="is-flex flex-mobile is-justify-content-space-between is-align-items-center mb-2">
  <div class="left-part">

    <h1 class="title is-2 has-text-weight-light">
       <span class="icon is-large">
          <i class="icon {{definition.icon}} is-size-2 has-text-link"></i>
        </span>
      {{ definition.title }}
    </h1>
  </div>
  <div class="right-part">
    <!-- Export button -->
    <a
      *ngIf="definition.buttons.indexOf(LinkType.EXPORT) > -1"
      class="button is-link ml-5 is-hidden-touch"
      routerLink="/{{ definition.path || definition.slug }}"
      [queryParams]="{ toXLS: 'true' }"
      queryParamsHandling="merge"
    >
      Export
    </a>
    <!-- Create button -->
    <ng-container *caseHasPermission="createResourcePermission">
    <a
      *ngIf="definition.buttons.indexOf(LinkType.CREATE) > -1"
      class="button is-link ml-5 is-hidden-touch"
      routerLink="/{{ definition.path || definition.slug }}/create"
    >
      Add a {{ definition.nameSingular }}
    </a>
    <a
      *ngIf="definition.buttons.indexOf(LinkType.CREATE) > -1"
      class="button is-circle is-link ml-5 is-hidden-desktop"
      routerLink="/{{ definition.path || definition.slug }}/create"
    >
      <i class="icon icon-plus"></i>
    </a>
    </ng-container>
  </div>
</div>

<!-- Onboarding -->
<div class="columns" *ngIf="isOnboarding">
<div class="column is-12 is-10-desktop is-offset-1-desktop  is-6-fullhd is-offset-3-fullhd">
<article class="message is-success has-text-left mt-4">
  <div class="message-body has-background-light">
    <p class="has-text-dark  title is-1 ">
     Welcome to the {{ definition.nameSingular }} list 👋🏽
    </p>
    <p class="has-text-dark mt-4">
    ✅ Good going, You just created the
      <strong> {{ definition.nameSingular }} </strong> entity !
    </p>
    <p class="has-text-dark mt-4">
    This page shows the list of {{ definition.namePlural }}. You can customize it by adding <strong>filters</strong>, new <strong>columns</strong>, action <strong>buttons</strong> and even key numbers.
  </p>
    <div class="buttons mt-3 mb-4">
    <a class="button is-outlined is-success" href="https://docs.case.app/#/list/list"  target="_blank">Add features to this list</a>
    <a class="button is-outlined is-success" href="https://docs.case.app/#/resources/create-a-property" target="_blank">Add a properties to {{ definition.namePlural }}</a>
    </div>
    <p class="message is-warning p-3 has-text-dark is-size-5">
    ℹ️ To hide this message, set the <span class="tag is-medium is-white-ter">isOnboarding</span> property to <strong>false</strong> in your environment file.
    </p>
  </div>
</article>
</div>
</div>

<!-- Filters -->
<section *ngIf="filters?.length">
  <div class="card p-4 mb-6 mt-4">
    <div class="columns">
      <div class="column">
        <h2 class="title is-6 has-text-weight-bold is-uppercase has-text-grey">Filters</h2>
      </div>
    </div>
    <div class="columns is-multiline is-align-items-flex-end" *ngIf="isFilterSelectOptionsFetched">
      <div
        class="column"
        [ngClass]="filter.className"
        *ngFor="let filter of filters"
      >
        <case-input
          [type]="filter.inputType"
          [initialValue]="filter.value"
          [selectOptions]="filter.selectOptions"
          [label]="filter.label"
          [searchResources]="filter.searchResources"
          [readonly]="filter.readonly"
          [placeholder]="filter.placeholder"
          [secondPlaceholder]="filter.secondPlaceholder"
          [required]="filter.required"
          [helpText]="filter.helpText"
          (valueChanged)="onFilterValueChanged($event, filter)"
        ></case-input>
      </div>
    </div>
  </div>
</section>

<!-- List -->
<ng-container *ngIf="paginator">
<!-- Main container -->
<nav class="level mb-2">
  <!-- Left side -->
  <div class="level-left">
    <div class="level-item">
    <case-meta [paginator]="paginator"></case-meta>
    </div>
  </div>

  <!-- Right side -->
  <div class="level-right is-hidden-mobile">
  <div class="level-item tags" >
  <span class="tag" *ngFor="let keyNumber of definition.keyNumbers" [ngClass]="keyNumber.className || 'is-info'">
  <ng-container *ngIf="keyNumber.loading">Loading...</ng-container>
        <ng-container *ngIf="!keyNumber.loading"
          >{{ keyNumber.label }}: {{ keyNumber.value | euros }}</ng-container
        >
  </span>
  </div>
  </div>
</nav>
  <div class="card p-0 mb-6">
    <div class="table-container">
      <case-table
        [items]="paginator.data"
        [definition]="definition"
        [yields]="yields"
        [orderBy]="filterForm.orderBy"
        [orderByDesc]="filterForm.orderByDesc"
        (orderByChanged)="onOrderByChanged($event)"
      ></case-table>
    </div>
  </div>

  <case-pagination
    [paginator]="paginator"
    (pageChange)="onPageChanged($event)"
  ></case-pagination>
</ng-container>

<div *ngIf="loading" class="is-list-loading pt-7">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div class="is-hidden-touch"></div>
  <div class="is-hidden-touch"></div>
  <div class="is-hidden-touch"></div>
  <div class="is-hidden-touch"></div>
  <div class="is-hidden-touch"></div>
  <div class="is-hidden-touch"></div>
  <div class="is-hidden-touch"></div>
</div>
`
