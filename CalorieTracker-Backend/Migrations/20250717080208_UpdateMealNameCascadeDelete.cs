using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CalorieTracker.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMealNameCascadeDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_MealNames_MealNameId",
                table: "Meals");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_MealNames_MealNameId",
                table: "Meals",
                column: "MealNameId",
                principalTable: "MealNames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_MealNames_MealNameId",
                table: "Meals");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_MealNames_MealNameId",
                table: "Meals",
                column: "MealNameId",
                principalTable: "MealNames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
