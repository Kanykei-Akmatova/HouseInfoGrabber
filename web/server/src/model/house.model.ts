import { Table, Column, Model, HasMany } from "sequelize-typescript";

@Table
export class House extends Model {
  @Column
  house_code: string;

  @Column
  address: string;

  @Column
  record_date: string;

  @Column
  not_in_listing_date: string;

  @Column
  bedrooms: string;

  @Column
  bathrooms: string;

  @Column
  region_code: string;
}