using CalorieTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace CalorieTracker.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<FoodSummary> Foods { get; set; }
        public DbSet<MealName> MealNames { get; set; }
        public DbSet<Meal> Meals { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {  
            modelBuilder.Entity<Meal>(entity =>
            {
                entity.HasKey(m => m.Id);
                entity.Property(m => m.Quantity).IsRequired();
                entity
                    .HasOne(m => m.MealName)
                    .WithMany(mn => mn.Meals)
                    .OnDelete(DeleteBehavior.Restrict);
                entity
                    .HasOne(m => m.Food)
                    .WithMany(f => f.Meals)
                    .OnDelete(DeleteBehavior.Restrict);
            });
            modelBuilder.Entity<MealName>(entity =>
            {
                entity.HasKey(mn => mn.Id);
                entity.Property(mn => mn.Name).IsRequired();
                entity
                    .HasMany(mn => mn.Meals)
                    .WithOne(m => m.MealName)
                    .OnDelete(DeleteBehavior.Restrict);
            });
            modelBuilder.Entity<FoodSummary>(entity =>
            {
                entity.HasKey(f => f.Id);
                entity.Property(f => f.Name).IsRequired();
                entity.Property(f => f.Protein).IsRequired();
                entity.Property(f => f.Carbohydrates).IsRequired();
                entity.Property(f => f.Fat).IsRequired();
                entity.Property(f => f.Calories).IsRequired();
            entity
                .HasMany(f => f.Meals)
                .WithOne(m => m.Food)
                .OnDelete(DeleteBehavior.Restrict);
            });
            modelBuilder.Entity<UserMeals>(entity =>
            {
                entity.HasKey(um => um.Id);
                entity
                    .HasOne(um => um.User)
                    .WithMany(u => u.UserMeals);
                entity
                    .HasOne(um => um.MealName)
                    .WithMany(mn => mn.UserMeals);
            });
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(256);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.PasswordHash).IsRequired();
                entity.Property(e => e.Role).IsRequired();
                entity
                    .HasMany(u => u.UserMeals)
                    .WithOne(mn => mn.User);
            });
        }
    }
}