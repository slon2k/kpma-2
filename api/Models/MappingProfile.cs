using api.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CategoryCreateDto, Category>();
            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryUpdateDto, Category>();

            CreateMap<Image, ImageDto>();
            CreateMap<ImageCreateDto, Image>();
            CreateMap<ImageUpdateDto, Image>();

            CreateMap<Article, ArticleDto>()
                .ForMember(dest => dest.Gallery, opt => opt.MapFrom(src => src.Images.Where(i => !i.IsMain)))
                .ForMember(dest => dest.Picture, opt => opt.MapFrom(src => src.Picture))
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Slug));
            CreateMap<ArticleCreateDto, Article>().
                ForMember(dest => dest.Images, opt => opt.MapFrom(src => new List<ImageCreateDto>() { src.Picture }));
            CreateMap<ArticleUpdateDto, Article>();
        }
    }
}
