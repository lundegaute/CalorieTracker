using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace CalorieTracker.Migrations
{
    /// <inheritdoc />
    public partial class AddedMealPlanTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MealPlanId",
                table: "MealNames",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "MealPlans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealPlans", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_MealNames_MealPlanId",
                table: "MealNames",
                column: "MealPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_MealNames_MealPlans_MealPlanId",
                table: "MealNames",
                column: "MealPlanId",
                principalTable: "MealPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MealNames_MealPlans_MealPlanId",
                table: "MealNames");

            migrationBuilder.DropTable(
                name: "MealPlans");

            migrationBuilder.DropIndex(
                name: "IX_MealNames_MealPlanId",
                table: "MealNames");

            migrationBuilder.DropColumn(
                name: "MealPlanId",
                table: "MealNames");
        }
    }
}
