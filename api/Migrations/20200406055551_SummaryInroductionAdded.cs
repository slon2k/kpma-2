using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class SummaryInroductionAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Introduction",
                table: "Articles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Summary",
                table: "Articles",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Introduction",
                table: "Articles");

            migrationBuilder.DropColumn(
                name: "Summary",
                table: "Articles");
        }
    }
}
