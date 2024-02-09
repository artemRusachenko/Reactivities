using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDto>>> {}

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _context;
            //private readonly ILogger<List> _logger;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)//, ILogger<List> logger)
            {
                _mapper = mapper;
                //_logger = logger;
                _context = context;
            }
            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // try{
                //     for(int i = 0; i < 10; i++){
                //         cancellationToken.ThrowIfCancellationRequested();
                //         await Task.Delay(1000, cancellationToken);
                //         _logger.LogInformation($"Task {i} has completed");
                //     }
                // }catch(System.Exception){
                //     _logger.LogInformation($"Task was canceled");
                // }
                var activities = await _context.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}