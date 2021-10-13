using Microsoft.EntityFrameworkCore.Migrations;

namespace Supemarket.Migrations
{
    public partial class addSomeColumnsOnProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "type",
                table: "Products",
                newName: "number_of_items");

            migrationBuilder.RenameColumn(
                name: "startDate",
                table: "Products",
                newName: "production_date");

            migrationBuilder.RenameColumn(
                name: "parcode",
                table: "Products",
                newName: "made_in");

            migrationBuilder.RenameColumn(
                name: "numberOfPecis",
                table: "Products",
                newName: "category");

            migrationBuilder.RenameColumn(
                name: "endtDate",
                table: "Products",
                newName: "expiry_date");

            migrationBuilder.AddColumn<bool>(
                name: "active",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<double>(
                name: "height",
                table: "Products",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "length",
                table: "Products",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "width",
                table: "Products",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "active",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "height",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "length",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "width",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "production_date",
                table: "Products",
                newName: "startDate");

            migrationBuilder.RenameColumn(
                name: "number_of_items",
                table: "Products",
                newName: "type");

            migrationBuilder.RenameColumn(
                name: "made_in",
                table: "Products",
                newName: "parcode");

            migrationBuilder.RenameColumn(
                name: "expiry_date",
                table: "Products",
                newName: "endtDate");

            migrationBuilder.RenameColumn(
                name: "category",
                table: "Products",
                newName: "numberOfPecis");
        }
    }
}
