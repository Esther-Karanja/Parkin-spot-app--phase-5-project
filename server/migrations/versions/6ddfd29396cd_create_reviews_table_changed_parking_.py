"""Create reviews table,changed parking spots to parking_spots

Revision ID: 6ddfd29396cd
Revises: 750f479a6d63
Create Date: 2024-01-31 14:56:12.274672

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6ddfd29396cd'
down_revision = '750f479a6d63'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('parking_spots',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('location', sa.String(), nullable=True),
    sa.Column('latitude', sa.Float(), nullable=True),
    sa.Column('longitude', sa.Float(), nullable=True),
    sa.Column('type', sa.String(), nullable=False),
    sa.Column('capacity', sa.String(), nullable=False),
    sa.Column('pricing', sa.String(), nullable=False),
    sa.Column('restrictions', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(), nullable=False),
    sa.Column('time', sa.DateTime(), nullable=True),
    sa.Column('location_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['location_id'], ['parking_spots.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('parking spots')
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_is_activated', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('phone', sa.String(length=100), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('phone')
        batch_op.drop_column('_is_activated')

    op.create_table('parking spots',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('location', sa.VARCHAR(), nullable=True),
    sa.Column('latitude', sa.FLOAT(), nullable=True),
    sa.Column('longitude', sa.FLOAT(), nullable=True),
    sa.Column('type', sa.VARCHAR(), nullable=False),
    sa.Column('capacity', sa.VARCHAR(), nullable=False),
    sa.Column('pricing', sa.VARCHAR(), nullable=False),
    sa.Column('restrictions', sa.VARCHAR(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('reviews')
    op.drop_table('parking_spots')
    # ### end Alembic commands ###