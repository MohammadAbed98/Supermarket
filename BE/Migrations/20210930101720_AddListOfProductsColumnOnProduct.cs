using Microsoft.EntityFrameworkCore.Migrations;

namespace Supemarket.Migrations
{
    public partial class AddListOfProductsColumnOnProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "listOfProducts",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "listOfProducts",
                table: "Orders");
        }
    }
}
